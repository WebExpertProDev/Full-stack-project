import json, datetime, re, string, random
from json import JSONEncoder
from decimal import Decimal
from rest_framework import status
from rest_framework.response import Response
from django.conf import settings
from django.core.paginator import Paginator


def get_class_fields(_class):
    return [a for a in dir(_class) if not a.startswith('__') and not callable(getattr(_class, a))]


def roundNumberTo(number, decimals):
    return round(number * pow(10, decimals)) / pow(10, decimals)


def get_ip_address(requestMeta):
    x_forwarded_for = requestMeta.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        return x_forwarded_for.split(',')[-1].strip()
    else:
        return requestMeta.get('REMOTE_ADDR')


def next_array_item(item, array):
    for i in range(len(array)):
        if item < array[i]:
            return array[i]
    return -1

class MyEncoder(JSONEncoder):
    def default(self, o):
        return o.__dict__

def get_json(cls):
    return json.loads(MyEncoder().encode(cls))


def string_to_date(date_string):
    format_str = '%Y-%m-%d'  # The format
    return datetime.datetime.strptime(date_string, format_str).date()

def string_to_time(time_string):
    format_str = '%H:%M:%S'  # The format
    return datetime.datetime.strptime(time_string, format_str).time()

class ResponseHandler:
    def __init__(self, request):
        self.request = request

    def get_query_parameter_or_empty(self, query_string):
        try:
            value = self.request.query_params[query_string]
        except:
            value = ""
        return value


def group_by_type(data, pathToType):
    final_result = {}
    seen_types = []
    for object in data:
        try:
            type = eval("object" + pathToType)
        except:
            continue
        if type not in seen_types:
            seen_types.append(type)
            final_result[str(type)] = [object]
        else:
            final_result[str(type)].append(object)
    return final_result


def write_json_to_file(path, json_data):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(json_data, f, ensure_ascii=False, indent=4)


def read_json_file(path):
    with open(path) as f:
        return json.load(f)


def flatten_list(_2dArray):
    return [item for sublist in _2dArray for item in sublist]


def get_checksum(input_string):
    checksum = 0
    index = 1
    for char in input_string:
        checksum += (ord(char) * 997 * index) % 937
        index = index + 1
    return checksum


def extract_numbers_from_text(text):
    regex_match = re.findall(r'-?\d+\.?\d*', text)
    return list(map(lambda x: int(x), regex_match))


def generate_random_string(length):
    return ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(length))


def extract_canadian_zip_code(text):
    return re.findall(r'(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]', text)


def array_diff(first, second):
    second = set(second)
    return [item for item in first if item not in second]


def response_bad_request(json_response):
    return Response(json_response, status=status.HTTP_400_BAD_REQUEST)


def produce_final_response(cbv_object, request): #cbv: class based view
    final_response = {}
    data_queryset = cbv_object.get_queryset()
    serializer = cbv_object.get_serializer(data_queryset, many=True)
    # make sure you need to do next line.
    # serializer.is_valid(raise_exception=True)
    data = serializer.data
    handler = ResponseHandler(request)
    page_number = handler.get_query_parameter_or_empty('page')
    count = handler.get_query_parameter_or_empty('count')
    status_code = status.HTTP_200_OK
    if not data:
        final_response['data'] = []
        status_code = status.HTTP_200_OK # TODO: think about this case
        return Response(final_response, status_code)
    try:
        paginator = Paginator(data, settings.PAGINATION_PER_PAGE)
        total_count = paginator.count
        if not page_number:
            page_number = 1
        current_page_number = int(page_number)
        if current_page_number > paginator.num_pages or current_page_number < 1:
            final_response = {'error': 'page query parameter is outside of range'}
            status_code = status.HTTP_400_BAD_REQUEST
            return Response(final_response, status_code)
        else:
            paginated_data = paginator.get_page(current_page_number).object_list
            num_current_page_items = settings.PAGINATION_PER_PAGE  # default
            if current_page_number == paginator.num_pages:
                num_current_page_items = total_count - (current_page_number - 1) * settings.PAGINATION_PER_PAGE
            final_response['pagination'] = {
                'total_count': total_count,
                'total_pages': paginator.num_pages,
                'current_page_number': current_page_number,
                'current_page_items': num_current_page_items,
                'has_next': paginator.page(page_number).has_next(),
                'has_previous': paginator.page(page_number).has_previous()
            }
    except ValueError as error:
        status_code = status.HTTP_400_BAD_REQUEST
        error_message = str(error)
        final_response = {'error': 'page query parameter is not a valid integer'}
        return Response(final_response, status_code)
    if count:
        try:
            count_int = int(count)
        except:
            final_response = {'error': 'count should be an integer'}
            status_code = status.HTTP_400_BAD_REQUEST
            return Response(final_response, status_code)
        if count_int > settings.PAGINATION_PER_PAGE:
            final_response = {'error': 'count should be less than settings.PAGINATION_PER_PAGE'}
            status_code = status.HTTP_400_BAD_REQUEST
            return Response(final_response, status_code)
        elif count_int <= 0:
            final_response = {'error': 'count should be > 0'}
            status_code = status.HTTP_400_BAD_REQUEST
            return Response(final_response, status_code)
        elif count_int > num_current_page_items:
            final_response = {'error': 'count cannot be greater than current_page_items'}
            status_code = status.HTTP_400_BAD_REQUEST
            return Response(final_response, status_code)
    else:
        count_int = num_current_page_items

    final_response['data'] = paginated_data[:count_int]
    final_response['pagination'].update({'current_page_items': count_int})
    final_response['status_code'] = status_code
    return Response(final_response, status_code)


class Map(dict):
    """
    Example:
    m = Map({'first_name': 'Eduardo'}, last_name='Pool', age=24, sports=['Soccer'])
    """
    def __init__(self, *args, **kwargs):
        super(Map, self).__init__(*args, **kwargs)
        for arg in args:
            if isinstance(arg, dict):
                for k, v in arg.items():
                    self[k] = v

        if kwargs:
            for k, v in kwargs.items():
                self[k] = v

    def __getattr__(self, attr):
        return self.get(attr)

    def __setattr__(self, key, value):
        self.__setitem__(key, value)

    def __setitem__(self, key, value):
        super(Map, self).__setitem__(key, value)
        self.__dict__.update({key: value})

    def __delattr__(self, item):
        self.__delitem__(item)

    def __delitem__(self, key):
        super(Map, self).__delitem__(key)
        del self.__dict__[key]

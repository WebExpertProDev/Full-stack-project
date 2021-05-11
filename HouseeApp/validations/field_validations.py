
def is_valid_phone_number(phone_number):
    import re
    return bool(re.match('\+1[0-9]{10}', phone_number))


def is_valid_email(email):
    # TODO: to be implemented
    return True

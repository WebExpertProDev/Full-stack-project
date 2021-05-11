from rest_framework.response import Response
from rest_framework import status


class PTResponse:

    def __init__(self, http_status_code, message, success):
        self.http_status_code = http_status_code
        self.message = message
        self.json_response = {
            'success': success,
            'message': self.message,
        }

    def get_response(self):
        return Response(self.json_response, status=self.http_status_code)


class PTResponseStatus(PTResponse):

    def __init__(self, error_code, http_status_code, message):
        success = True
        super().__init__(http_status_code, message, success)
        self.error_code = error_code


class PTErrorResponse(PTResponse):
    def __init__(self, error_code, http_status_code, message, solution):
        success = False
        super().__init__(http_status_code, message, success)
        self.error_code = error_code
        self.solution = solution

    def get_response(self):
        self.json_response.update({
            'error_code': self.error_code,
            'solution': self.solution
        })
        return super().get_response()


class PTApiException:
    http_status_code = status.HTTP_400_BAD_REQUEST # DEFAULT
    json_response = {
        'success': False
    }

    def get_response(self):
        return Response(self.json_response, status=self.http_status_code)


class LoginFailedWrongCredentialsException(PTApiException):

    def __init__(self):
        self.json_response.update({
            'error_code': 101,
            'message': 'Login Failed. username of password is wrong'
        })


class LoginFailedGuestException(PTApiException):

    def __init__(self):
        self.json_response.update({
            'error_code': 123,
            'message': 'Login Failed. you need to first setup a password for your account to be able to login'
        })

class LoginFailedMissingCredentialsException(PTApiException):

    def __init__(self):
        self.json_response.update({
            'error_code': 102,
            'message': 'Login Failed. username of password is missing in body'
        })


class LoginFailedPhoneNumberNotVerifiedException(PTApiException):

    def __init__(self):
        self.json_response.update({
            'error_code': 103,
            'message': 'Login Failed. phone number is not verified'
        })


class RegistrationFailedMissingRequiredDataException(PTApiException):

    def __init__(self):
        self.json_response.update({
            'error_code': 104,
            'message': 'Registration Failed. one or more of the required fields are missing.',
        })


class RegistrationFailedInvalidFormatException(PTApiException):

    def __init__(self, details = ''):
        self.json_response.update({
            'error_code': 105,
            'message': 'Registration Failed. ' + details
        })


class PhoneNumberApprovalException(PTApiException):

    def __init__(self, details = ''):
        self.json_response.update({
            'error_code': 106,
            'message': 'Could not approve phone number. ' + details
        })


class SendSmsException(PTApiException):
    def __init__(self, details = ''):
        self.json_response.update({
            'error_code': 107,
            'message': 'Could not send sms to the provided phone number. ' + details
        })


class ChangePasswordException(PTApiException):
    def __init__(self, details = ''):
        self.json_response.update({
            'error_code': 108,
            'message': 'Could not change password. ' + details
        })


class ApproveProjectException(PTApiException):
    def __init__(self, details = ''):
        self.json_response.update({
            'error_code': 109,
            'message': 'Could not approve project. ' + details
        })


def is_in_enum_choices(item, choices):
    return item in map(lambda x: x[0], choices)

import requests
from django.conf import settings
from django.core.mail import EmailMessage
from common.thread_worker import run_async

# TEST MODE
class Response:
    status_code = 201 # POST SUCCESS


class SibSmsClient:

    def __init__(self, recipient_number):
        self.recipient_number = recipient_number

    def send_transactional_sms(self, content):
        if settings.ENV != 'production':
            return Response
        url = "https://api.sendinblue.com/v3/transactionalSMS/sms"
        payload = {
            "type": "transactional",
            "sender": "PenderTap",
            "recipient": self.recipient_number,
            "content": content
        }
        headers = {
            'accept': "application/json",
            'content-type': "application/json",
            'api-key': settings.ANYMAIL['SENDINBLUE_API_KEY']
        }
        return requests.post(url, json=payload, headers=headers)

class SibEmailClient:

    @staticmethod
    def send_transactional_email(subject, to_email, template_id, merge_vars=None):
        message = EmailMessage(
            subject=subject,  # required for SendinBlue templates
            body=None,  # required for SendinBlue templates
            to=[to_email]  # single recipient...
            # ...multiple to emails would all get the same message
            # (and would all see each other's emails in the "to" header)
        )
        message.from_email = 'info@housee.ai'  # required for SendinBlue templates
        message.template_id = template_id
        if merge_vars:
            message.merge_global_data = merge_vars
        # message.esp_extra = { # TODO: any global setting to be applied to all emails
        #     "sender_domain": settings.ANYMAIL['SENDINBLUE_SENDER_DOMAIN']
        # }

        run_async(message.send)

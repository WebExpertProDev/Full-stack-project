from django.conf import settings
import requests, json


# Used to send push notifications to the user
class FirebaseCloudMessagingManager:
    @classmethod
    def notify_all_devices(cls, registration_ids, message_title, message_body):
        url = 'https://fcm.googleapis.com/fcm/send'
        payload = {
            'registration_ids': registration_ids,
            'priority': 'high',
            'notification': {
                'title': message_title,
                'body': message_body
            }
        }
        headers = {
            'Authorization': 'key=%s' % settings.FIREBASE_SERVER_KEY,
            'Content-Type': 'application/json'
        }
        response = requests.post(url, data=json.dumps(payload), headers=headers)
        return json.loads(response.text)

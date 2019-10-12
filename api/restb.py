import requests
import base64
import urllib.request
import tempfile
import os

root_url = 'https://api-us.restb.ai/vision/v2/'
client_key = '27fabe8d2131a451c5cc9b785568c9aa95911614153c31dbcf6dd3b9fe9b403d'


def get_room_info(image_path):
    model_type = 'real_estate_global_v2'
    model_features = 're_features_v3'
    model_appliances = 're_appliances'
    with open(image_path, 'rb') as image:
        encoded_image = base64.b64decode(image.read())
    response = requests.post(root_url, params={
        'model_id': ','.join([model_type, model_features, model_appliances]),
        'image_base64': encoded_image,
        'client_key': client_key
    })
    if response.status_code == 200:
        solutions = response.json()['response']['solutions']
        room_type = solutions[model_type]['top_prediction']['label']
        detections = solutions[model_features]['detections'] + solutions[model_appliances]['detections']
        features = [detection['label'] for detection in detections]
        return {'room_type': room_type, 'features': features}
    else:
        print(response)


def test_room_info():
    image_path = '{}.jpg'.format(
        os.path.splitext(next(tempfile._get_candidate_names()))[0]
    )
    urllib.request.urlretrieve("https://www.opalsands.com/getmedia/8766c2d7-9e28-4a37-824e-da6a8101f915/Deluxe_King_Guest_Room_575035_high.jpg/?width=3000&height=2000&ext=.jpg&maxsidesize=800", image_path)
    room_info = get_room_info(image_path)
    print(room_info['room_type'])
    print(room_info['features'])


test_room_info()

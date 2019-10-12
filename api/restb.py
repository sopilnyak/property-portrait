import requests

root_url = 'https://api-eu.restb.ai/vision/v2/multipredict'
client_key = '27fabe8d2131a451c5cc9b785568c9aa95911614153c31dbcf6dd3b9fe9b403d'


def get_single_room_info(image_url):
    model_type = 'real_estate_global_v2'
    model_features = 're_features_v3'
    model_appliances = 're_appliances'
    response = requests.get(root_url, params={'client_key': client_key,
                                              'model_id': ','.join([model_type, model_features, model_appliances]),
                                              'image_url': image_url
                                              })
    if response.status_code == 200:
        solutions = response.json()['response']['solutions']
        room_type = solutions[model_type]['top_prediction']['label']
        detections = solutions[model_features]['detections'] + solutions[model_appliances]['detections']
        features = [detection['label'] for detection in detections]
        return {'room_type': room_type, 'features': features}


def get_rooms_info(image_urls):
    return [get_single_room_info(url) for url in image_urls]


def test_room_info():
    image_urls = ['https://cnet4.cbsistatic.com/img/Gu0ly_clVsc-EHnRAea7i0GUhRI=/1600x900/2019/03/14/2609b0eb-1263-43e2'
                  '-9380-c1f8cbced873/gettyimages-1089101352.jpg',
                  'https://cdn.shopify.com/s/files/1/2660/5202/products/gbciun6b8ha51n8x3jsm_1400x.jpg?v=1536591617',
                  'https://image.wrenkitchens.com/frontal_range/milano_ultra_bianco_gloss_1418.jpg?q=70&w=510&h=454&'
                  'fit=crop&s=7007e79fb17f2b843eab5d33b097c725']
    room_info = get_rooms_info(image_urls)
    print(room_info)


test_room_info()

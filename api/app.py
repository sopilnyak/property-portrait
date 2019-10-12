from flask import Flask, request
import boto3
from restb import get_rooms_info
from collections import defaultdict
from tools import prettify_join
from descr import make_description

app = Flask(__name__)
storage = {}

s3_client = boto3.client('s3', aws_access_key_id='AKIA4ZL7FY35J7J32R64',
                         aws_secret_access_key='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')
s3_bucket_name = 'property-portrait'


def group_by_types(image_urls, room_info):
    types = defaultdict(list)
    for image_url, info in zip(image_urls, room_info):
        types[info['room_type'].capitalize()].append(image_url)
    result = []
    for type, urls in types.items():
        result.append({'room': type, 'image_urls': urls})
    return result


def get_tip(existing_types, form):
    existing_types = set(existing_types)
    recommended_types = {'bathroom': 'bathroom',
                         'outdoor_building': 'facade',
                         'kitchen': 'kitchen',
                         'corridor': 'corridor'}
    if 'bedrooms' in form and int(form['bedrooms']) > 0:
        recommended_types['bedroom'] = 'bedroom'
    else:
        recommended_types['living_room'] = 'living room'

    tips = []
    for recommended_type, display_string in recommended_types.items():
        if recommended_type not in existing_types:
            tips.append(display_string)

    if len(tips) == 0:
        return ''
    return 'You might want to add photos of {}'.format(prettify_join(tips))


@app.route('/api/description', methods=['POST'])
def get_description():
    if request.method == 'POST':
        form = request.json['form']
        image_keys = request.json['image_keys']
        bucket_location = s3_client.get_bucket_location(Bucket=s3_bucket_name)
        image_urls = ['https://s3-{0}.amazonaws.com/{1}/{2}'.format(
            bucket_location['LocationConstraint'], s3_bucket_name, key)
            for key in image_keys]

        rooms_info = get_rooms_info(image_urls)
        types = group_by_types(image_urls, rooms_info)
        return {'description': make_description(0, defaultdict(str, form), rooms_info, language='en'),
                'tip': get_tip([t['room'] for t in types], form),
                'types': types}


@app.after_request
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    header['Access-Control-Allow-Headers'] = '*'
    return response


@app.route('/api/xml')
def get_xml():
    description = request.json['description']


if __name__ == '__main__':
    app.run()

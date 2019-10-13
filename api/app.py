from flask import Flask, request, redirect, send_from_directory
import boto3
from restb import get_rooms_info
from collections import defaultdict
from tools import prettify_join
from descr import make_description
from werkzeug.utils import secure_filename
import os
import uuid

app = Flask(__name__)
storage = {}

s3_client = boto3.client('s3', aws_access_key_id='AKIA4ZL7FY35EGYZBTFG',
                         aws_secret_access_key='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')
s3_bucket_name = 'property-portrait'


def group_by_types(image_urls, room_info):
    types = defaultdict(list)
    for image_url, info in zip(image_urls, room_info):
        types[info['room_type'].replace('_', ' ').capitalize()].append(image_url)
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
        session_id = request.json['session_id']
        image_urls = ['https://dae442f5.ngrok.io/api/image/' + key for key in image_keys]
        rooms_info = get_rooms_info(image_urls)
        types = group_by_types(image_urls, rooms_info)
        session_id, desc = make_description(session_id, defaultdict(str, form), rooms_info, language='en')
        return {'description': desc,
                'tip': get_tip([t['room'] for t in types], form),
                'types': types,
                'session_id': session_id}


@app.after_request
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    header['Access-Control-Allow-Headers'] = '*'
    return response


@app.route('/api/xml')
def get_xml():
    description = request.json['description']


@app.route('/api/upload', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        if 'file' not in request.files:
            return redirect(request.url)
        file = request.files['file']
        if file.filename == '':
            return redirect(request.url)
        if file:
            filename = secure_filename(file.filename)
            filename = '{base}-{uuid}{extension}'.format(
                base=os.path.splitext(filename)[0],
                uuid=str(uuid.uuid4()),
                extension=os.path.splitext(filename)[1]
            )
            if not os.path.exists('static'):
                os.makedirs('static')
            file.save(os.path.join('static', filename))
            return {'image_key': filename}


@app.route('/api/image/<string:name>')
def get_image(name):
    return send_from_directory('static', name)


if __name__ == '__main__':
    app.run()

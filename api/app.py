from flask import Flask, Blueprint, request
import boto3
from restb import get_rooms_info
import os


app = Flask(__name__)
blueprint = Blueprint('api', __name__, url_prefix='/api')
app.register_blueprint(blueprint)

s3_client = boto3.client('s3', aws_access_key_id="AKIA4ZL7FY35J7J32R64",
                         aws_secret_access_key="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")
s3_bucket_name = 'property-portrait'


def make_description(rooms_info):
    if len(rooms_info) > 0:
        return 'Property has a {} with {}'.format(rooms_info[0]['room_type'], ', '.join(rooms_info[0]['features']))
    else:
        return ''


@app.route('/description')
def get_description():
    image_keys = request.args.get('image_keys').split(',')
    bucket_location = s3_client.get_bucket_location(Bucket=s3_bucket_name)
    image_urls = ["https://s3-{0}.amazonaws.com/{1}/{2}".format(
        bucket_location['LocationConstraint'], s3_bucket_name, key)
        for key in image_keys]

    rooms_info = get_rooms_info(image_urls)
    return {'description': make_description(rooms_info), 'tip': 'Add some more rooms'}


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)

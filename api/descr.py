import random
from tools import prettify_join


def make_description(session_id: int, params: dict, photo_features: list, language="en") -> str:
    if session_id == 0:
        session_id += random.randint(0, 6)
        session_id += random.randint(0, 1) * 10
        session_id += random.randint(0, 2) * 100
        session_id += random.randint(0, 1) * 1000
        session_id += random.randint(0, 1) * 10000

    adv1 = session_id % 10
    adv1_words = {0: "fantastic", 1: "spectacular", 2: "beautiful", 3: "excellent", 4: "nice",
                  5: "wonderful", 6: "magnificent"}
    adv_bath = session_id // 10 % 10
    adv_bath_words = {0: "", 1: "functional"}
    adv_living = session_id // 100 % 10
    adv_living_words = {0: "", 1: "spacious", 2: "stylish"}
    adv_kitchen = session_id // 1000 % 10
    adv_kitchen_words = {0: "", 1: "modern"}
    goodbye = session_id // 10000 % 10
    goodbye_words = {0: "In case you have any doubts, please don't hesitate to contact us.",
                     1: "Feel free to contact me for additional information."}

    room_types = set()
    kitchen_features = set()
    living_features = set()
    room_features = set()
    for room in photo_features:
        room_types.add(room["room_type"])
        features = set(map(lambda x: x.replace("_", " "), room["room_features"]))
        room_features |= features
        if room["room_type"] == "kitchen":
            kitchen_features |= features
        elif room["room_type"] == "bedroom" or room["room_type"] == "living_room":
            living_features |= features
    joined_features = room_types | room_features

    if language == "ru":
        return make_description_ru(joined_features, living_features, kitchen_features, params)

    main_template = "This %s %s for rent is located %s. \
The %s has floor area of %sm2 \
including %s bedroom%c, %s %sbathroom%c%s.\
%s %s %s %s %s %s %s %s %s\
Tel.: %s, %s\n"

    mult_bedr = "s" if params["bedrooms"] != "1" else ""
    mult_bath = "s" if params["bathrooms"] != "1" else ""
    terrace = " and terrace" if params["terrace"] else ""
    conditioning = " with air conditioning" if params["air_conditioning"] else ""
    outside_set = {"deck", "dock", "hot tub", "sport court", "garage", "lawn", "outdoor kitchen",
                   "outdoor living space", "pergola", "pool"}
    outside_set &= joined_features
    outside = ("Outside you will find %s." % (prettify_join(outside_set))) if len(outside_set) > 0 else ""

    view_set = {"mountain view", "water view"}
    view_set &= joined_features
    view = ("In addition, you can enjoy the magnificent %s every day." % (prettify_join(view_set))) if len(
        view_set) > 0 else ""

    condition = "The property %s.\n" % (
        "has been recently renovated" if params["renovated"] else "is in a perfect condition")

    living = "Our %sliving room has %s.\n" % (adv_living_words[adv_living], prettify_join(living_features))
    if len(living_features) == 0:
        living = ""

    kitchen = "The %skitchen is equipped with %s.\n" % (adv_kitchen_words[adv_kitchen], prettify_join(kitchen_features))
    if len(kitchen_features) == 0:
        kitchen = ""

    pets = "Living with pets is allowed.\n" if params["pets"] else ""
    disabled = "Home is adapted for persons with reduced mobility.\n" if params["disabled"] else ""

    return main_template % (
        adv1_words[adv1], params["type"], params["location"],
        params["type"], params["size"],
        params["bedrooms"], mult_bedr, params["bathrooms"], adv_bath_words[adv_bath], mult_bath, terrace,
        conditioning, outside, view, condition, living, kitchen, pets, disabled, goodbye_words[goodbye],
        params["phone"], params["name"])


def make_description_ru(joined_features: set, living_features: set, kitchen_features: set, params: dict):
    main_template = "Великолепные апартаменты в %s площадью %s м2 с %s гостиными и %s ванными комнатами.\
%s %s %s %s %s %s %s\n\
По любым вопросам обращайтесь по телефону %s, %s."

    outside_set = {"deck", "dock", "hot tub", "sport court", "garage", "lawn", "outdoor kitchen",
                   "outdoor living space", "pergola", "pool"}
    outside_set &= joined_features
    outside = ("Снаружи расположены %s." % (prettify_join(outside_set))) if len(outside_set) > 0 else ""

    view_set = {"mountain view", "water view"}
    view_set &= joined_features
    view = ("Каждый день вы сможете наслаждаться волшебным %s." % (prettify_join(view_set))) if len(
        view_set) > 0 else ""

    condition = "Жилье %s, установлен кондиционер.\n" % (
        "было недавно отремонтировано" if params["renovated"] else "в хорошем состоянии")

    living = "В гостиной находятся %s.\n" % (", ".join(living_features))
    if len(living_features) == 0:
        living = ""

    kitchen = "Кухня оборудована %s.\n" % (", ".join(kitchen_features))
    if len(kitchen_features) == 0:
        kitchen = ""

    pets = "Разрешается проживание с домашними животными.\n" if params["pets"] else ""
    disabled = "Дом приспособлен для людей с ограниченными возможностями.\n" if params["disabled"] else ""

    return main_template % (params["location"], params["size"], params["bedrooms"], params["bathrooms"],
                            outside, view, condition, living, kitchen, pets, disabled,
                            params['phone'], params["name"])

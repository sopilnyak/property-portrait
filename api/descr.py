import random
from typing import Tuple
from tools import prettify_join


def make_description(session_id: int, params: dict, photo_features: list, language="en") -> Tuple[int, str]:
    if (len(params["location"]) == 0 or
            len(params["name"]) == 0 or
            len(params["phone"]) == 0 or
            len(params["size"]) == 0):
        return 0, "Here will be your ad text..."

    if session_id == 0:
        session_id += random.randint(0, 6)
        session_id += random.randint(0, 1) * 10
        session_id += random.randint(0, 2) * 100
        session_id += random.randint(0, 1) * 1000
        session_id += random.randint(0, 1) * 10000

    adv1 = session_id % 10
    adv1_words = {0: "fantastic", 1: "spectacular", 2: "beautiful", 3: "excellent", 4: "nice",
                  5: "wonderful", 6: "magnificent"}
    adv_living = session_id // 100 % 10
    adv_living_words = {0: "", 1: "spacious ", 2: "stylish "}
    adv_kitchen = session_id // 1000 % 10
    adv_kitchen_words = {0: "", 1: "modern "}
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
        return make_description_ru(session_id, joined_features, living_features, kitchen_features, params)

    main_template = "This %s %s for rent is located %s. \
The %s has floor area of %s including %s. \
%s%s%s%s%s\n\
%s%s%s\n%s \
Price: %s. Tel.: %s, %s.\n"

    rooms = [params["bedrooms"], params["bathrooms"]]
    rooms[0] += " bedroom"
    if params["bedrooms"] != "1":
        rooms[0] += "s"
    if params["air_conditioning"]:
        rooms[0] += " with air conditioning"
    rooms[1] += " bathroom"
    if params["bathrooms"] != "1":
        rooms[1] += "s"
    if params["terrace"]:
        rooms.append("terrace")
    rooms = prettify_join(rooms)

    outside_set = {"deck", "dock", "hot tub", "sport court", "garage", "lawn", "outdoor kitchen",
                   "outdoor living space", "pergola", "pool"}
    outside_set &= joined_features
    outside = ("Outside you will find %s. " % (prettify_join(outside_set))) if len(outside_set) > 0 else ""

    view_set = {"mountain view", "water view"}
    view_set &= joined_features
    view = ("In addition, you can enjoy the magnificent %s every day. " % (prettify_join(view_set))) if len(
        view_set) > 0 else ""

    condition = "The property %s.\n" % (
        "has been recently renovated" if params["renovated"] else "is in a perfect condition")

    living = "Our %sliving room has %s.\n" % (adv_living_words[adv_living], prettify_join(living_features))
    if len(living_features) == 0:
        living = ""

    kitchen = "The %skitchen is equipped with %s.\n" % (adv_kitchen_words[adv_kitchen], prettify_join(kitchen_features))
    if len(kitchen_features) == 0:
        kitchen = ""

    facilities = set()
    if params["transport"]:
        facilities.add("good transport connections")
    if params["schools"]:
        facilities.add("schools")
    if params["shops"]:
        facilities.add("plenty of shops")
    facilities = prettify_join(facilities)
    facilities = facilities.capitalize()
    if len(facilities) > 0:
        facilities += " are within walking distance. "

    pets = "Living with pets is allowed. " if params["pets"] else ""
    disabled = "Home is adapted for persons with reduced mobility." if params["disabled"] else ""

    price = "Price: " + params["price"] + ". " if len(params["price"]) > 0 else "Call for price. "

    return (session_id, main_template % (
        adv1_words[adv1], params["type"], params["location"],
        params["type"], params["size"], rooms,
        outside, view, condition, living, kitchen,
        facilities, pets, disabled, goodbye_words[goodbye],
        price, params["phone"], params["name"]))


def make_description_ru(session_id: int, joined_features: set, living_features: set, kitchen_features: set,
                        params: dict):
    toru = {"deck": "настил", "dock": "причал", "hot tub": "джакузи", "sport court": "стадион", "garage": "гараж",
            "lawn": "лужайка", "outdoor kitchen": "кухня",
            "outdoor living space": "беседка", "pergola": "беседка", "pool": "бассейн",
            "beamed ceiling": "", "carpet": "ковер", "ceiling fan": "потолочная вентиляция",
            "coffered ceiling": "кессонный потолок",
            "exposed bricks": "кирпичная кладка", "fireplace": "камин", "french doors": "стеклянные двери",
            "hardwood floor": "деревянный пол", "high ceiling": "высокий потолок", "kitchen bar": "кухонный бар",
            "kitchen island": "кухонный уголок",
            "natural light": "естественный свет", "notable chandelier": "", "skylight": "",
            "stainless steel": "нержавеющая сталь",
            "tile floor": "плиточный пол", "vaulted ceiling": "сводчатый потолок",
            "dishwasher": "посудомоечная машина", "elevator": "лифт", "microwave": "микроволновая печь",
            "oven": "духовой шкаф", "radiator": "батарея отопления", "refrigerator": "холодильник", "tv": "телевизор",
            "wall mounted ac": "кондиционер", "washer  dryer": "сушилка", "water heater": "бойлер"}
    main_template = "Великолепные апартаменты в %s площадью %s м2 с %s гостиными и %s ванными комнатами.\
%s %s %s %s %s %s %s\n\
По любым вопросам обращайтесь по телефону %s, %s."

    outside_set = {"deck", "dock", "hot tub", "sport court", "garage", "lawn", "outdoor kitchen",
                   "outdoor living space", "pergola", "pool"}
    outside_set &= joined_features
    outside = ("Снаружи расположены %s." % (prettify_join(map(lambda x: toru[x], outside_set)))) if len(
        outside_set) > 0 else ""

    view_set = {"mountain view", "water view"}
    view_set &= joined_features
    view = "Каждый день вы сможете наслаждаться волшебным %s." % (
        prettify_join(map(lambda x: toru[x], view_set))) if len(view_set) > 0 else ""

    condition = "Жилье %s, установлен кондиционер.\n" % (
        "было недавно отремонтировано" if params["renovated"] else "в хорошем состоянии")

    living = "В гостиной находятся %s.\n" % (prettify_join(map(lambda x: toru[x], living_features)))
    if len(living_features) == 0:
        living = ""

    kitchen = "Кухня оборудована %s.\n" % (prettify_join(map(lambda x: toru[x], kitchen_features)))
    if len(kitchen_features) == 0:
        kitchen = ""

    pets = "Разрешается проживание с домашними животными.\n" if params["pets"] else ""
    disabled = "Дом приспособлен для людей с ограниченными возможностями.\n" if params["disabled"] else ""

    return (session_id, main_template % (params["location"], params["size"], params["bedrooms"], params["bathrooms"],
                                         outside, view, condition, living, kitchen, pets, disabled,
                                         params['phone'], params["name"]))

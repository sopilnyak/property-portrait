import random


def get_description(session_id: int, params: dict, photo_features: list) -> str:
    if session_id == 0:
        session_id += random.randint(0, 6)
        session_id += random.randint(0, 1) * 10
        session_id += random.randint(0, 2) * 100
        session_id += random.randint(0, 1) * 1000

    adv1 = session_id % 10
    adv1_words = {0: "fantastic", 1: "spectacular", 2: "beautiful", 3: "excellent", 4: "nice",
                  5: "wonderful", 6: "magnificent"}
    adv_bathrooms = session_id // 10 % 10
    adv_bathrooms_words = {0: "", 1: "functional"}
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
        room_types |= room.room_type
        room_features |= set(map(lambda x: x.replace("_", " "), room.room_features))
        if room.room_type == "kitchen":
            kitchen_features |= room.room_features
        elif room.room_type == "bedroom" or room.room_type == "living_room":
            living_features |= room.room_features
    joined_features = room_types | room_features

    main_template = "This %s %s for rent is located %s. \
The %s has floor area of %s including %d bedrooms%s, %d %sbathrooms %sand terrace. %s %s %s %s %s %s %s \
Tel.: %d, %s\n"

    conditioning = " with air conditioning" if params["air_conditioning"] else ""
    outside_set = {"deck", "dock", "hot_tub", "sport_court", "garage", "lawn", "outdoor_kitchen",
                   "outdoor_living_space", "pergola", "pool"}
    outside_set &= joined_features
    outside = ("You can also find %s outside." % (", ".join(outside_set))) if len(outside_set) > 0 else ""

    view_set = {"mountain_view", "water_view"}
    view_set &= joined_features
    view = ("You can also find %s outside." % (", ".join(outside_set))) if len(outside_set) > 0 else ""

    condition = "The property %s.\n" % (
        "has been recently renovated" if params["renovated"] else "is in a perfect condition")

    living = "Our %sliving room has %s.\n" % (adv_living_words[adv_living], ", ".join(living_features))
    if len(living_features == 0):
        living = ""

    kitchen = "The %skitchen is equipped with %s.\n" % (adv_kitchen_words[adv_kitchen], ", ".join(kitchen_features))
    if len(kitchen_features == 0):
        kitchen = ""

    pets = "Living with pets is allowed.\n" if params["pets"] else ""
    disabled = "Home is adapted for persons with reduced mobility.\n" if params["disabled"] else ""

    return main_template % (
        adv1_words[adv1], "params[]", params["location"], "params", params["size"], params["bedrooms"],
        params["bathrooms"], adv_bathrooms_words[adv_bathrooms],
        conditioning, outside, view, condition, living, kitchen, pets, disabled, goodbye_words[goodbye],
        params["phone"], params["name"])

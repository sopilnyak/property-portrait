def prettify_join(array):
    array = list(array)
    if len(array) == 0:
        return ''
    if len(array) == 1:
        return array[0]
    return ', '.join(array[:-1]) + ' and ' + array[-1]

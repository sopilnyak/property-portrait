def prettify_join(array):
    if len(array) == 0:
        return ''
    array = list(array)
    if len(array) == 1:
        return array[0]
    return ', '.join(array[:-1]) + ' and ' + array[-1]

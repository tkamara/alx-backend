#!/usr/bin/env python3
"""LIFO Caching"""
BaseCaching = __import__('base_caching').BaseCaching


class LIFOCache(BaseCaching):
    """LIFO Caching"""
    def __init__(self):
        """initializing"""
        super().__init__()
        self.key_list = []

    def put(self, key, item):
        """adding to cache"""
        if key is not None and item is not None:
            self.cache_data[key] = item
            i = len(self.cache_data)
            if i > BaseCaching.MAX_ITEMS:
                last_key = self.key_list.pop()
                del self.cache_data[last_key]
                print("DISCARD: {}".format(last_key))

            self.key_list.append(key)

    def get(self, key):
        """get data in cache"""
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data[key]

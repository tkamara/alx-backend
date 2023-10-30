#!/usr/bin/env python3
"""FIFO Caching"""
BaseCaching = __import__('base_caching').BaseCaching


class FIFOCache(BaseCaching):
    """FIFO Caching"""
    def __init__(self):
        """initializing"""
        super().__init__()
        self.key_list = []

    def put(self, key, item):
        """adding to cache"""
        if key is not None and item is not None:
            self.cache_data[key] = item
            self.key_list.append(key)
            if len(self.cache_data) > BaseCaching.MAX_ITEMS:
                first_key = self.key_list.pop(0)
                del self.cache_data[first_key]
                print("DISCARD: {}".format(first_key))

    def get(self, key):
        """get data in cache"""
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data[key]

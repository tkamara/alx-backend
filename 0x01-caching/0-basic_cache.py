#!/usr/bin/env python3
"""caching system"""
BaseCaching = __import__('base_caching').BaseCaching


class BasicCache(BaseCaching):
    """inherited class"""
    def put(self, key, item):
        """adds item in cache"""
        if key is not None or item is not None:
            self.cache_data[key] = item

    def get(self, key):
        """return value linked to key"""
        if key is None or key not in self.cache_data:
            return None
        else:
            return self.cache_data[key]

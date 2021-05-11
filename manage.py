#!/usr/bin/env python
import os
import sys

def init_db():
    import django
    django.setup()
    from config.database_setup import init_db
    init_db()

def run_manage_py(args=None):
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    if not args:
        args = sys.argv
    if args[1].lower() == "initdb":
        init_db()
    else:
        execute_from_command_line(args)

if __name__ == '__main__':
    run_manage_py()

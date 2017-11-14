# -*- coding: utf-8 -*-
#from django.views.decorators.http import
#from django.views.decorators.csrf import
#from django.contrib.auth.decorators import


def customer_required():
    """
    Decorator that checks if a user is currently logged in, has a profile and a 'customer' role
    """
    def check_role(request):
        return True

"""
def producer_required():
    pass

def profile_required():
    pass
"""

"""
def permission_required(perm, login_url=None, raise_exception=False):
    def check_perms(user):
        if isinstance(perm, six.string_types):
            perms = (perm, )
        else:
            perms = perm
        # First check if the user has the permission (even anon users)
        if user.has_perms(perms):
            return True
        # In case the 403 handler should be called raise the exception
        if raise_exception:
            raise PermissionDenied
        # As the last resort, show the login form
        return False
    return user_passes_test(check_perms, login_url=login_url)
"""
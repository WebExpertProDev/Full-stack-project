class IncorrectLogin(Exception):
    def __init__(self):
        super().__init__("Login Failed: Incorrect username or password")


class InvalidSyntax(Exception):
    def __init__(self):
        super().__init__("(20206) Query Failed: Invalid query syntax")


class UnknownResource(Exception):
    def __init__(self):
        super().__init__("(20400) Query Failed: The query could not be understood due to an unknown resource")


class UnknownType(Exception):
    def __init__(self):
        super().__init__("(20401) Query Failed: The query could not be understood due to an unknown type")


class UnkownIdentifier(Exception):
    def __init__(self):
        super().__init__("(20402) Query Failed: The query could not be understood due to an unknown identifier (the ID is not in the correct format)")


class NoObjectFound(Exception):
    def __init__(self):
        super().__init__("(20403) Query Failed: No matching object was found to satisfy the request")


class UnkownMetadataType(Exception):
    def __init__(self):
        super().__init__("(20501) Query Failed: The query could not be understood due to an unknown metadata type")


class UnknownMetadataIdentifier(Exception):
    def __init__(self):
        super().__init__("(20502) Query Failed: The identifier is not known inside the specified resource")


class NoMetadataFound(Exception):
    def __init__(self):
        super().__init__("(20503) Query Failed: No matching metadata of the type requested was found")

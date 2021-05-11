from enum import Enum


class UserType:
    Admin = 'Admin'
    Landlord = 'Landlord'
    Tenant = 'Tenant'
    Agent = 'Agent'

    CHOICES = (
        (Admin, "Admin"),
        (Landlord, "Landlord"),
        (Tenant, "Tenant"),
        (Agent, "Agent")
    )


# TODO: add CA and USA states later
class CountryState:
    # Canada
    BritishColumbia = 'British Columbia'

    # United States

    CHOICES = (
        (BritishColumbia, 'British Columbia'),
    )


class Country:
    Canada = 'Canada'
    UnitedStates = 'United States'
    CHOICES = (
        (Canada, 'Canada'),
        (UnitedStates, 'United States'),
    )
    STATES = {
        'Canada': (
            (CountryState.BritishColumbia, 'British Columbia'),
        )
    }


class City:
    Vancouver = 'Vancouver'
    Toronto = 'Toronto'

    CHOICES = (
        (Vancouver, 'Vancouver'),
        (Toronto, 'Toronto'),
    )


# Estate Enums


class ResidentialEstatePropertyType:
    Flat = 'Flat'
    Duplex = 'Duplex'
    Triplex = 'Triplex'

    CHOICES = (
        (Flat, 'Flat'),
        (Duplex, 'Duplex'),
        (Triplex, 'Triplex'),
    )


class AdvertisementStatus:
    Draft = 'Draft'
    Review = 'Review'
    Live = 'Live'
    Expired = 'Expired'

    CHOICES = (
        (Draft, 'Draft'),
        (Review, 'Review'),
        (Live, 'Live'),
        (Expired, 'Expired'),
    )


class AdvertisementType:
    Presale = 'Presale'
    Rent = 'Rent'
    Sale = 'Sale'

    CHOICES = (
        (Presale, 'Presale'),
        (Rent, 'Rent'),
        (Sale, 'Sale'),
    )


class Language:
    English = 'English'
    French = 'French'

    CHOICES = (
        (English, 'English'),
        (French, 'French'),
    )


class UserRegistrationStatus: #add 2 for sms approval and 1 for email approval
    Guest = 0
    WaitingForEmailAndSmsApproval = 1
    WaitingForEmailApproval = 2
    WaitingForSmsApproval = 3
    Done = 4

    @staticmethod
    def get_sms_approved_status(current_status):
        return {
            UserRegistrationStatus.WaitingForEmailAndSmsApproval: UserRegistrationStatus.WaitingForEmailApproval,
            UserRegistrationStatus.WaitingForEmailApproval: UserRegistrationStatus.WaitingForEmailApproval,
            UserRegistrationStatus.WaitingForSmsApproval: UserRegistrationStatus.Done,
            UserRegistrationStatus.Done: UserRegistrationStatus.Done
        }[current_status]

    @staticmethod
    def get_email_approved_status(current_status):
        return {
            UserRegistrationStatus.WaitingForEmailAndSmsApproval: UserRegistrationStatus.WaitingForSmsApproval,
            UserRegistrationStatus.WaitingForEmailApproval: UserRegistrationStatus.Done,
            UserRegistrationStatus.WaitingForSmsApproval: UserRegistrationStatus.WaitingForSmsApproval,
            UserRegistrationStatus.Done: UserRegistrationStatus.Done
        }[current_status]

    CHOICES = (
        (Guest, 'Guest'),
        (WaitingForEmailAndSmsApproval, 'Waiting For Email And Sms Approval'),
        (WaitingForEmailApproval, 'Waiting For Email Approval'),
        (WaitingForSmsApproval, 'Waiting For Sms Approval'),
        (Done, 'Done')
    )


### Backend only constants
class LogSeverity:
    Low = 1
    Medium = 2
    High = 3

    CHOICES = (
        (Low, 'Low'),
        (Medium, 'Medium'),
        (High, 'High')
    )


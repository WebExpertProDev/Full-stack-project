from rest_framework.authtoken.models import Token
from manage import run_manage_py
import psycopg2, os
from HouseeApp.models import HouseeUser
from django.conf import settings


def get_class_fields(_class):
    return [a for a in dir(_class) if not a.startswith('__') and not callable(getattr(_class, a))]

#--------- START TEST SUPER USER CREDENTIALS ---------
superuser_credentials = {
    'full_name': 'superuser',
    'email': 'masoud.javeri@housee.ai',
    'username': 'vgyd7f637uy3hgvyd',
    'phone_number': '0017783026930',
    'password': '37637euygdBVSjuy32i723dhbd'
}
#--------- END TEST SUPER USER CREDENTIALS ---------

# ---APPS START---

class HouseeApp:
    HouseeUser = "HouseeUser"

class LandlordApp:
    LandlordUser = "LandlordUser"

class TenantApp:
    TenantUser = "TenantUser"

class AgentApp:
    AgentUser = "AgentUser"

# ---APPS END---

class DjangoManagePy:
    @classmethod
    def run(cls, command):
        run_manage_py(['manage.py', command])

class Table:
    def __init__(self, table_name, pk_start_with):
        self.name = table_name
        self.pk_start_with = pk_start_with

    @classmethod
    def getTable(cls, app_class, model):
        table_json = settings.DB_TABLES[app_class.__name__][model]
        table_name = '{}_{}'.format(app_class.__name__, model.lower())
        return Table(table_name, table_json['pk_start_with'])

# --- DATABASE SETUP HELPERS START ---
class DatabaseDriver:

    def __init__(self, database_details):
        self.name = database_details['NAME']
        self.config = {
            'host': database_details['HOST'],
            'database': self.name,
            'user': database_details['USER'],
            'password': database_details['PASSWORD']
        }

    def drop_create_database(self):
        self.drop_database()
        self.create_database()

    def drop_database(self):
        os.system('dropdb {} -U {}'.format(self.name, superuser_credentials['username']))
        os.system('dropdb {}'.format(self.name))
        print('database "{}" dropped successfully!'.format(self.name))

    def create_database(self):
        os.system('createdb {} -U {}'.format(self.name, superuser_credentials['username']))
        os.system('createdb {}'.format(self.name))
        grant_command = 'GRANT ALL PRIVILEGES ON DATABASE "{}" TO {};'.format(self.name, self.config['user'])
        self.run_sql(grant_command)
        alter_password_command = "ALTER USER {} WITH PASSWORD '{}';".format(self.config['user'], self.config['password'])
        self.run_sql(alter_password_command)
        print('database "{}" created successfully!'.format(self.name))

    def run_sql(self, sql_query, multiple_rows=None):
        conn = None
        try:
            conn = psycopg2.connect(**self.config)
            cur = conn.cursor()
            if multiple_rows is None:
                cur.execute(sql_query)
            else:
                cur.executemany(sql_query, multiple_rows)
            conn.commit()
            cur.close()
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
        finally:
            if conn is not None:
                conn.close()

    def alter_table_sequences(self):
        apps = [HouseeApp, LandlordApp, TenantApp, AgentApp]
        for app_class in apps:
            app_models = get_class_fields(app_class)
            for model in app_models:
                table = Table.getTable(app_class, model)
                alter_sequence_query = 'ALTER SEQUENCE public."{}_id_seq" RESTART WITH {}'.format(table.name, table.pk_start_with)
                self.run_sql(alter_sequence_query)
        print('Table sequences altered successfully!')

class MigrationsManager:

    def remove_make_migrate(self):
        self.remove_old_migrations()
        self.make_migrations()
        self.migrate()

    def make_migrations(self):
        DjangoManagePy.run('makemigrations')
        print('Migrations Made successfully!')

    def remove_old_migrations(self):
        dirname = os.path.dirname
        current_path = os.path.abspath(__file__)
        project_path = dirname(dirname(current_path))
        project_path = project_path.replace(' ', '\ ')
        os.system('sudo find . {} -path "*/migrations/*.py" -not -name "__init__.py" -delete'.format(project_path))
        os.system('sudo find . {} -path "*/migrations/*.pyc" -delete'.format(project_path))
        print('Old migrations removed successfully!')

    def migrate(self):
        DjangoManagePy.run('migrate')
        print('Tables created successfully!')

class UserFactory:

    def __init__(self, user_credentials):
        self.full_name = user_credentials['full_name']
        self.email = user_credentials['email']
        self.username = user_credentials['username']
        self.phone_number = user_credentials['phone_number']
        self.password = user_credentials['password']

    def create_superuser_and_token(self, user_credentials):
        # order matters
        self.create_superuser()
        self.create_user_token()

    def create_superuser(self):
        self.superuser = HouseeUser.objects.create_superuser(email=self.email, full_name=self.full_name,
                                                             password=self.password, phone_number=self.phone_number)
        print()
        print('--------- START SUPER USER CREDENTIALS ---------')
        print('username: {}'.format(self.username))
        print('password: {}'.format(self.password))
        print('--------- END SUPER USER CREDENTIALS ---------')
        print()

    def create_user_token(self):
        user = HouseeUser.objects.get(phone_number=self.phone_number)
        token = Token.objects.create(user=user)
        print('--------- START TOKEN ---------')
        print('Token {}'.format(token.key))
        print('--------- END TOKEN ---------')
        print()

class FakePopulator:

    def fill(self):
        pass


# --- DATABASE SETUP HELPERS END ---

def run_server():
    os.system('python3 manage.py runserver')

def init_db():
    driver = DatabaseDriver(settings.DATABASE_DETAILS)
    migrations_manager = MigrationsManager()
    user_factory = UserFactory(superuser_credentials)
    driver.drop_create_database()
    migrations_manager.remove_make_migrate()
    driver.alter_table_sequences()
    user_factory.create_superuser_and_token(superuser_credentials)
    print('Database setup is done!')
    print('Filling database with fake data...')
    FakePopulator().fill()
    print('Running Server...')
    run_server()

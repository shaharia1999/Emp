# Generated by Django 4.2.3 on 2023-10-29 09:13

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('emp', '0008_rename_employee_attendance_emp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='uid',
            field=models.UUIDField(auto_created=True, default=uuid.uuid4),
        ),
    ]

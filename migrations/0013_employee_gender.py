# Generated by Django 4.2.3 on 2023-10-29 10:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('emp', '0012_employee_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='gender',
            field=models.CharField(blank=True, choices=[('Male', 'Male'), ('Female', 'Female')], max_length=15, null=True),
        ),
    ]

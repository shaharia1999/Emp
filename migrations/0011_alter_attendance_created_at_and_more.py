# Generated by Django 4.2.3 on 2023-10-29 09:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('emp', '0010_alter_attendance_created_at_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attendance',
            name='created_at',
            field=models.DateTimeField(blank=True, editable=False, null=True),
        ),
        migrations.AlterField(
            model_name='attendance',
            name='updated_at',
            field=models.DateTimeField(blank=True, editable=False, null=True),
        ),
    ]
# Generated by Django 4.2.3 on 2023-10-29 08:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('emp', '0003_salaryinvoice_is_recived_salaryinvoice_total_amount_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='password',
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
    ]

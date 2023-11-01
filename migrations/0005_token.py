# Generated by Django 4.2.3 on 2023-10-29 08:35

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('emp', '0004_employee_password'),
    ]

    operations = [
        migrations.CreateModel(
            name='Token',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('token', models.UUIDField(default=uuid.UUID('09c601eb-1c6c-417e-a9b1-ad3ad63cc3a0'))),
                ('created_at', models.DateTimeField(blank=True, editable=False, null=True)),
                ('updated_at', models.DateTimeField(blank=True, editable=False, null=True)),
                ('emp', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='emp.employee')),
            ],
        ),
    ]
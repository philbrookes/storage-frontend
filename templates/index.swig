<h1>User list</h1>
<ul>
    <li>
        <a href="/user/add">Create new user</a>
    </li>
{% for user in users %}
    <li>
        <a href="/user/{{ user.id }}/edit">{{ user.name }}</a>
    </li>
{% endfor %}
</ul>

<form action="/user/{{ user.id }}" method="POST">
    <input type="text" name="name" value="{{ user.name }}" placeholder="Enter a username" />
    <input type="submit" value="{% if user.id %}Update{% else %}Add{% endif %}" />
</form>
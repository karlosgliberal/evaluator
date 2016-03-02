export default class userTestDataBuilder {

    build() {
        return {id: this.id, name: this.name, email: this.email, avatar: this.avatar};
    }

    static buildSingle() {
        var userTestDataBuilders = userTestDataBuilder();

        return userTestDataBuilders.withId('::id::').withName('::name::').withEmail('::email::').withAvatar('::avatar::').build()
    }

    withId(id) {
        this.id = id;
    }

    withName(name) {
        this.name = name;
    }

    withEmail(email) {
        this.email = email;
    }

    withAvatar(avatar) {
        this.avatar = avatar;
    }
}
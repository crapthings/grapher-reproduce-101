Template.hello.onCreated(function helloOnCreated() {

  const query = Projects.createQuery({
    name: 1, // project name

    owner: {
      name: 1, // member name
      group: {
        name: 1, // group name
      },
    },

    members: {
      name: 1, // member name
      gender: 1, // member gender
      group: {
        name: 1,
      },
    },
  })

  this.projects = new ReactiveVar([])

  Tracker.autorun(() => {
    if (query.subscribe().ready()) {
      console.log(JSON.stringify(query.fetch(), null, 4))
      this.projects.set(query.fetch())
    }
  })

});

Template.hello.helpers({
  projects() {
    return Template.instance().projects.get()
  },
})

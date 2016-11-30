Template.hello.onCreated(function helloOnCreated() {

  const query = Projects.createQuery({
    name: 1,
    owner: {
      name: 1,
      gender: 1,
    },
    memberIds: 1,
    members: {
      name: 1,
      gender: 1,
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

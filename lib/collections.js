import _ from 'lodash'

Projects = new Mongo.Collection('projects')

Members = new Mongo.Collection('members')

Projects.addLinks({
  owner: {
    type: 'one',
    collection: Members,
    field: 'ownerId',
  },

  members: {
    type: 'many',
    collection: Members,
    field: 'memberIds'
  }
})

if (Meteor.isServer) {

  Projects.expose()
  // Comments.expose()

  fake()

}

function fake() {

  _.each([Projects, Members], c => c.remove({}))

  const members = _.times(20, n => ({
    _id: Random.id(),
    gender: _.sample(['male', 'female']),
    name: 'usr' + n,
  }))

  const projects = _.times(10, n => ({
    _id: Random.id(),
    name: 'project' + n,
    ownerId: _.sample(_.map(members, '_id')),
    memberIds: _.sampleSize(_.map(members, '_id'), 3),
  }))

  _.each(projects, d => Projects.insert(d))
  _.each(members, d => Members.insert(d))

}

import _ from 'lodash'

Projects = new Mongo.Collection('projects')

Members = new Mongo.Collection('members')

Groups = new Mongo.Collection('groups')

Projects.addLinks({
  owner: {
    type: 'one',
    collection: Members,
    field: 'ownerId',
    index: true,
  },

  members: {
    type: 'many',
    collection: Members,
    field: 'memberIds',
    index: true,
  },
})

Members.addLinks({
  group: {
    type: 'one',
    collection: Groups,
    field: 'groupId',
    index: true,
  },
})

if (Meteor.isServer) {

  Projects.expose()
  // Members.expose()
  // Groups.expose()
  fake()

}

function fake() {

  _.each([Groups, Projects, Members], c => c.remove({}))

  const groups = _.times(2, n => ({
    _id: Random.id(),
    name: 'group' + n,
  }))

  const members = _.times(3, n => ({
    _id: Random.id(),
    groupId: _.sample(_.map(groups, '_id')),
    gender: _.sample(['male', 'female']),
    name: 'usr' + n,
  }))

  const projects = _.times(1, n => ({
    _id: Random.id(),
    name: 'project' + n,
    ownerId: _.sample(_.map(members, '_id')),
    memberIds: _.sampleSize(_.map(members, '_id'), 3),
  }))

  _.each(groups, d => Groups.insert(d))
  _.each(members, d => Members.insert(d))
  _.each(projects, d => Projects.insert(d))

}

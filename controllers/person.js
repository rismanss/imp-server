const db = require('../models/index');
const person = db.Person;

module.exports = {
  getAll(req, res) {
    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);

    let page = 1;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {
      page = pageAsNumber
    }

    let size = 10;
    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber < 10) {
      size = sizeAsNumber
    }

    return person.findAndCountAll({
      limit: size,
      offset: (page - 1) * size,
      include: {all: true}
    }).then(result => {
      res.status(200).send({
        message: "success",
        totalResult: result.count,
        data: result.rows
      })
    }).catch(err => {
      res.status(500).send({
        message: "bad request",
        error: err
      })
    })
  },

  getById(req, res) {
    return person.findByPk(req.params.id).then(result => {
      if(!result) {
        return res.status(404).send({
          message: 'Not Found !',
        })
      }
      return res.status(200).send({
        message: "success",
        data: result
      })
    }).catch(err => {
      res.status(500).send({
        message: "bad request",
        error: err
      })
    })
  },

  add(req, res) {
    return person.create({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email
    }).then(result => {
      res.status(200).send({
        message: 'success add data',
        data: result
      })
    }).catch(err => {
      res.status(500).send({
        message: 'bad request',
        error : err
      })
    })
  },

  update(req, res) {
    return person.findByPk(req.params.id).then(result => {
      if (!result) {
        return res.status(404).send({message: 'Not Found !'})
      }
      return result.update({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
      }).then(data => {
        res.status(200).send({
          message: 'success update data',
          data: data
        })
      }).catch(err => {
        res.status(500).send({
          message: 'bad request',
          error: err
        })
      })
    }).catch(e => {
      res.send(500).send({
        message: 'bad request',
        error: e
      })
    })
  },

  remove(req, res) {
    return person.findByPk(req.params.id).then(result => {
      if (!result) {
        return res.status(404).send({message: 'Not Found !'})
      }
      return result.destroy().then(() => {
        res.status(200).send({message: 'success delete'})
      }).catch(err => {
        res.status(500).send({
          message: 'bad request',
          error: err
        })
      })
    }).catch(e => {
      res.status(500).send({
        message: 'error',
        error: e
      })
    })
  }
}
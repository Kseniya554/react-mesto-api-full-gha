const Card = require('../models/card');

const BadRequestError = require('../errors/BadRequestError ');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getCards = (req, res, next) => {
  Card.find()
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      card.populate(['owner'])
        .then((cardPopulate) => res.status(201).send(cardPopulate));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Неверно заполнены поля'));
        return;
      }
      next(err);
      // console.log(JSON.stringify(e));
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    // .orFail(() => new NotFoundError('Карточка не найдена'))
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки нет');
      }
      if (`${card.owner}` !== req.user._id) {
        throw new ForbiddenError('Нет доступа на удаление карточки');
      }
      return Card.findByIdAndDelete()
        .then(() => res.status(200).send(card));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный id'));
        return;
      }
      next(err);
    });
};

const putLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .populate(['owner', 'likes'])
    .orFail(() => {
      throw new NotFoundError('Not found');
    })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Неверно заполнены поля'));
        return;
      }
      next(err);
    });
};

const deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .populate(['owner', 'likes'])
    .orFail(() => {
      throw new NotFoundError('Not found');
    })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Неверно заполнены поля'));
        return;
      }
      next(err);
    });
};

module.exports = {
  getCards, deleteCard, createCard, putLike, deleteLike,
};

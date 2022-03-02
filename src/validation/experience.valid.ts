import { check, param } from "express-validator";

const create = [
  check("company")
    .isString()
    .withMessage("O nome deve ser do tipo string")
    .not()
    .isEmpty()
    .withMessage("O nome é obrigatório")
    .isLength({ max: 200 })
    .withMessage("O nome deve ter no máximo 200 caractéres"),
  check("description")
    .isString()
    .withMessage("A descrição deve ser do tipo string")
    .not()
    .isEmpty()
    .withMessage("A descrição é obrigatória")
    .isLength({ max: 600 })
    .withMessage("A descrição deve ter no máximo 600 caractéres"),
  check("office")
    .isString()
    .withMessage("O cargo deve ser do tipo string")
    .not()
    .isEmpty()
    .withMessage("O cargo é obrigatório"),
  check("technologies")
    .isArray()
    .withMessage("As tecnologias devem ser do tipo array de strings")
    .not()
    .isEmpty()
    .withMessage("As tecnologias são obrigatórias"),
  check("startDate")
    .isString()
    .withMessage("A data inicial deve ser do tipo Date")
    .not()
    .isEmpty()
    .withMessage("A data inicial é obrigatória"),
  check("endDate").optional({ nullable: true }),
  check("isCurrently")
    .isBoolean()
    .withMessage("'Trabalho atualmente' deve ser do tipo boolean")
];

const del = [param("id").not().isEmpty().withMessage("A id é obrigatória")];

const edit = [...del, ...create];

export default {
  create,
  delete: del,
  edit
};

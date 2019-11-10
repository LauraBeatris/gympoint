import Joi from 'joi';
import Plan from '../models/Plan';
import validationSchema from '../../validationSchemas/plans';

class PlansController {
  async store(req, res) {
    Joi.validate(req.body, validationSchema.store, err => {
      if (err) return res.status(400).json({ err: err.details });

      return true;
    });

    const { title, duration, price } = req.body;

    // Veryfing if there's an existing plan with the same name
    const existingPlan = await Plan.findOne({ where: { title } });

    if (existingPlan) {
      return res
        .status(400)
        .json({ err: "There's already a plan with that name" });
    }

    const { id } = await Plan.create({ title, duration, price });

    return res.json({ id, title, price, duration });
  }

  async update(req, res) {
    Joi.validate(req.body, validationSchema.store, err => {
      if (err) return res.status(400).json({ err: err.details });

      return true;
    });

    const { plan_id } = req.params;

    if (!plan_id) {
      return res.status(400).json({ err: 'Plan id not provided' });
    }

    const { title } = req.body;

    // Veryfing if there's an existing plan with the same name
    const existingPlan = await Plan.findOne({ where: { title } });

    if (existingPlan) {
      return res
        .status(400)
        .json({ err: "There's already a plan with that name" });
    }

    // Finding the plan and updating
    const plan = await Plan.findByPk(plan_id);
    const { id, duration, price } = await plan.update(req.body);
    await plan.save();

    return res.json({ id, title, duration, price });
  }

  async delete(req, res) {}

  async index(req, res) {}
}

export default new PlansController();
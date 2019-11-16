const router = require('express').Router();
const Student = require('../db/models/student');
const Test = require('../db/models/test');

module.exports = router;


router.get('/', async(req, res, next) => {
    try {
        const allStudents = await(Student.findAll());
        res.send(allStudents);
    } catch (error) { next (error)};
    
})

router.get('/:id', async(req, res, next) => {
    try {
        const studentId = await(Student.findOne({where: {id: req.params.id}}));
        //let studentId = await Student.findOne(req.params.id);
        if (studentId) { 
            res.send(studentId);
        } else {
            res.status(404).send('not found');
        } 
    } catch (error) {next(error)}    
})

router.post('/', async (req, res, next) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).send(student);

    } catch (error) {next (error)}   
})

router.put('/:id', async(req, res, next) => {
    try {
        let updatedStudent = await Student.update(req.body, {
            where: {id: req.params.id},
            returning: true,
            plain: true
        });
        res.send(updatedStudent[1]);
    } catch (error) {next (error)}
});


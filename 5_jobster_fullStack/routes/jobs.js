const express = require('express')
const router = express.Router()


const testUser = require('../middleware/testUser')

const {
  showStats,
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
} = require('../controllers/jobs')

/**() */ 
/**
 * Restrict  createJob,deleteJob,updateJob for Test user
 */


router.route('/').post(testUser,createJob).get(getAllJobs)
router.route('/stats').get(showStats)
router.route('/:id').get(getJob).delete(testUser,deleteJob).patch(testUser,updateJob)

module.exports = router


import Student from '../model/students.js';
import  errormessage  from '../utils/errorMessage.js';
import cloudinary from '../utils/cloud.js';
import  successmessage  from '../utils/successMessage.js';


class StudentController {
     static async create(req, res) {
        try {
            const { firstName, lastName, age, sex, grade } = req.body

            if (!req.file) {
                return errormessage(res, 400, `please upload file`)
            }

            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'students'
            });

            const student = await Student.create({
                studentReport: {
                    public_id: result.public_id,
                    url: result.secure_url,
                },
                firstName,
                lastName,
                age,
                sex,
                grade
            })
            if (student) {
                return successmessage(res, 201, `student created`, student)
            } else {
                return errormessage(res, 401, `fail to create student`)
            }


        } catch (error) {
            console.error('Error occurred:', error);
            return errormessage(res, 500, `internal server error`)
        }
    }

 static async viewStudents(req ,res) {
        try {
            const student = await Student.find()
            if (student) {
                return successmessage(res, 200, `all students retrived`, student)
            }
            else {
                return errormessage(res, 401, `no students found`)
            }
        } catch (error) {
            console.error('Error occurred:', error);
            // return errormessage(res, 500, `internal server error`)
        }
    }
    static async viewStudent(req,res){
        const studentID = req.params.id
        const student = await Student.findById(studentID)
        if(student){
            return successmessage(res,200,`student ${student.firstName} retrived`,student)
        }
    }

     static async deleteStusdent(req, res){
        try {
            const studentID = req.params.id
            const student = await Student.findByIdAndDelete(studentID);
            if (student) {
                return errormessage(res, 200, `student deleted successfully`)
            }
            else {
                return errormessage(res, 401, `student not deleted`)
            }

        } catch (error) {
            console.error('Error occurred:', error);
            return errormessage(res, 500, `internal server error`)
        }
    }
 static async updateStudent(req,res){
    const studentID = req.params.id;
    const student = await Student.findByIdAndUpdate(studentID,req.body, {new:true})
    if(student){
        return successmessage(res,200,`student updated successfully`,student)
    }else{
        return errormessage(res,401,`student not updated`)
    }
}

}
export default StudentController
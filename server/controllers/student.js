const { db } = require("../models")
const express = require("express");

module.exports = {

    fillStudentForm :async (req,res) => {
        const payload = req.decode.payload;
        const body = req.body; 
        const user_id = payload.id; 
        const updateData = {};
        console.log(typeof payload)
        try { 
            const insert = await db.Student.upsert({
                user_id:user_id, 
                ...body
            })
    
            return res.json({
                success:1,
                message:"Details updated" ,
                insert 
            }); 
        } catch(error) {
            res.json({
                success:0,
                error 
            })
        }
        
    },

    getStudentProfile :async (req,res)=>{
        const id = req.params.id;
        try { 
            const student = await db.Student.findOne( {where:{id:id}} );  
            res.json({
                success:1,
                student  
            });
        } catch(error) {
            console.log(error); 
            res.json({
                success:0,
                error:error 
            }); 
        }
        
    }
}
import { Details, Members, Profile } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { Request, Response } from "express";
import { time } from "console";

//use for create a Profile
const createDetails = async (req: Request, res: Response): Promise<any> => {
  const data = await prisma.$transaction(async (tx) => {
    const { memberId, ...othersData } = req.body;

    const isExists: Members | null = await tx.members.findUnique({
      where: { id: memberId },
    });
    if (!isExists) {
      throw new Error("failed to find");
      
    }

    const details: Details = await tx.details.create({
      data: { ...othersData, memberId },
    });
    return details;
  });
  return data;
};

const updateDetails = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id: detailsId } = req.params;
    const {  ...detailsData } = req.body;

    const data = await prisma.$transaction(async (tx) => {
      // Check if details exist
      const existingDetails = await tx.details.findUnique({
        where: { id: detailsId },
      });

      if (!existingDetails) {
       throw new Error("failed to find details");
       
      }

      // Update `Details`
     try {
      const updatedDetails = await tx.details.update({
        where: { id: detailsId },
        data: detailsData,
      });
      return updatedDetails;
     } catch (error) {
      throw new Error(`update details is failed: ${(error as Error).message}`);
      
     }
    });
    // Set a timeout for the transaction
    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Transaction timed out")), 5000000));
    return Promise.race([data, timeoutPromise]);

   return data;
  } catch (error) {
    console.error(error);
   throw new Error("update details is failed");
   
  }
};


const getDetails = async (id: string): Promise<Details> => {
  if (!id) throw new Error("id is required");
  console.log(id);
  const result: any = await prisma.details.findFirst({ where: { id: id } });

  return result;
};

const deleteDetails = async (id: string): Promise<any> => {
  const result = await prisma.$transaction(async (tx) => {
    const details = await tx.details.delete({
      where: {
        id: id,
      },
    });
    return details;
  });

  return result;
};



const updateEducation = async (req: Request, res: Response): Promise<any> => {
  const data= await prisma.$transaction(async (tx) => {
    const id = req.params.id;
    const { detailsId,...edudata } = req.body;
    const isExists: Details | null = await tx.details.findUnique({
      where: { id: detailsId },
    });
    if (!isExists) {
     throw new Error("Details not found");
     
    }
    const isEducation=await tx.education.findUnique({where:{id}});
    if(!isEducation){
      try {
        const education = await tx.education.create({data: { ...edudata, detailsid: detailsId }});
      return education;
      } catch (error) {
       throw new Error("failed to create education");
       
      }
    }
    try {
      const education = await tx.education.update({where:{id},data:edudata});
      return education;
    } catch (error) {
     throw new Error("failed to update education");
           

    }

  })
}

const getEducation = async (id: string): Promise<Details> => {
  if (!id) throw new Error("id is required");
  console.log(id);
 try {
  const result: any = await prisma.education.findFirst({ where: { id: id } });

  return result;    
 } catch (error) {
 throw new Error("failed to get education");
 
 }
}
const updateWork = async (req: Request, res: Response): Promise<any> => {
  const data= await prisma.$transaction(async (tx) => {
    const id = req.params.id;
    const { detailsId,...workdata } = req.body;
    const isExists: Details | null = await tx.details.findUnique({
      where: { id: detailsId },
    });
    if (!isExists) {
     throw new Error("Details not found");
     
    }
    const isWork=await tx.work.findUnique({where:{id}});
    if(!isWork){
      try {
        const work = await tx.work.create({data: { ...workdata, detailsid: detailsId }});
      return work;
      } catch (error) {
        throw new Error("failed to create work");
        
      }
    }
    try {
      const work = await tx.work.update({where:{id},data:workdata});
      return work;
    } catch (error) {
     throw new Error("failed to update work");
        

    }

  })
}

const getWork = async (id: string): Promise<Details> => {
  if (!id) throw new Error("id is required");
  console.log(id);
 try {
  const result: any = await prisma.work.findFirst({ where: { id: id } });

  return result;    
 } catch (error) {
 throw new Error("failed to get education");
 
 }
}

export const detailsService = {
  createDetails,
  updateDetails,
  getDetails,
  deleteDetails,
  updateEducation,
  getEducation,
  updateWork,
  getWork,
};

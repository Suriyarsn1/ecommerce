const  Menu =require("../model/menumodel")


exports.getMenu=async(req,res)=>
    {
        try
        {
        const Menus=await Menu.find()
        res.status(200).json(Menus)  
        }
        catch(err)
        {
        res.status(503).json({message:'Cannot Fetch Menus '})
        }
    }






exports.createMenu=async(req,res)=>
{
    try
    {
    const data={menuTitle,menuCat}=req.body
    const newMenu=new Menu({menuTitle,menuCat, subMenuTitle:[]})
    const saved=await newMenu.save()
    res.status(200).json({message:'Menu Sucessfully Saved'})  
    }
    catch(err)
    {
    res.status(503).json({message:'Menu Not Saved'})
    }
}


exports.addSubMenu=async(req,res)=>
    {  
        const newsubMenuTitle=req.body.subMenuTitle
        try
        {
        const Menus=await Menu.findById(req.params.id)
        console.log(Menus)
        Menus.subMenuTitle.push(newsubMenuTitle)
        await Menus.save()
        res.status(200).json({message:'SubMenu Saved Sucessfully '})  
        }
        catch(err)
        {
        res.status(503).json({message:'Cannot Fetch Menus '})
        }
    }

    exports.deleteMenu=async(req,res)=>
        {
            
            try
            {
            const Menus=await Menu.findByIdAndDelete(req.params.id)
            res.status(200).json({message:'Menu Sucessfully Deleted'})  
            }
            catch(err)
            {
            res.status(503).json({message:'Cannot Fetch Menus '})
            }
        }
    
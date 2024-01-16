import { usersDataStruct } from './InputField';
import './styles/dropdown.css'

const DropDown = ({dropDownRef,usersData,handleUserAdding,selectedUsersId,currentUser}:any) => {
     return (
                <div className={`dropdown-box max-h-64 absolute top-10 overflow-y-scroll`} ref={dropDownRef} onMouseDown={e=>e.preventDefault()} onMouseUp={e=>{
                }}>
                    {
                        usersData.map((value:usersDataStruct,index:number)=>{
                        if(!selectedUsersId.has(index) && (value.name.toLowerCase().startsWith(currentUser.toLowerCase()) || value.email.toLowerCase().startsWith(currentUser.toLowerCase()) )){
                        return ( <div className='flex p-4 justify-between hover:bg-gray-100 cursor-pointer' key={index} onClick={(event)=>{
                                event.preventDefault()
                                handleUserAdding(index);
                                }}>
                                <div className='rounded-full w-12 h-12 border-gray-200 border-[1px] flex justify-center items-center text-2xl'>
                                    {value.name.charAt(0)}
                                </div>
                                <div className='p-[0.7rem]'>
                                    {value.name}
                                </div>
                                <div className='p-[0.7rem]'>
                                    {value.email}
                                </div>
                            </div> )}
                        })
                    }
                </div>
      );
}
 
export default DropDown;
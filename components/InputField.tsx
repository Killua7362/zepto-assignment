'use client'
import { useCallback, useEffect, useRef, useState } from "react";
import DropDown from "./DropDown";
import usersData from '../data/data.json';

export interface usersDataStruct{
    name:string,
    email:string
}

const InputField = () => {
    const [isInputActive,setInputActive] = useState<boolean>(false);
    const [selectedUsersId,setSelectedUsersId] = useState<Set<number>>(new Set());
    const [currentUser,setCurrentUser] = useState<string>("")
    const [borderColor,setBorderColor] = useState<string>("gray")
    const [highlightId,setHighLightId] = useState<number>(-1)

    const dropDownRef = useRef<HTMLInputElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const dropDownEnterHandler = ()=>{
            setBorderColor("#3f4fa0");
            setInputActive(true)
    }

    const dropDownLeaveHandler = ()=>{
        if(dropDownRef !== null && dropDownRef.current !== null){
            dropDownRef!.current!.scrollTo({top:0});
        }
        
        if(currentUser === "" && selectedUsersId.size === 0){
            setBorderColor("gray");
        }
        setInputActive(false)
    }

    const handleUserAdding = (id:number) => {
        setSelectedUsersId((prev:Set<number>)=>new Set([...prev,id]))
        setHighLightId(-1)
    }

    const  handleDeleteFunction = (id:number) => {
        setSelectedUsersId(
            ( prev:Set<number> )=>new Set([...prev].filter(userId=>userId != id))
        )
        setHighLightId(-1)
    }
    const handleUserKeyPress = useCallback((event:KeyboardEvent) => {
        const { key } = event;
        if(key === "Backspace" && highlightId !== -1){
                handleDeleteFunction(highlightId)
                setHighLightId(-1)
                inputRef!.current!.focus();
        }
    }, [highlightId]);

    useEffect(() => {
        window.addEventListener("keydown", handleUserKeyPress);
        return () => {
            window.removeEventListener("keydown", handleUserKeyPress);
        };
    }, [handleUserKeyPress]);

    return (
        <div className="w-screen flex justify-center" tabIndex={1} onKeyDown={(e)=>{
        }}>
            <div className="flex justify-center mt-36 z-50 w-[50%]">
                <div className="flex">
                    {
                       usersData.map((value:usersDataStruct,index:number)=>{
                        if(selectedUsersId.has(index)){
                            return(
                                <div className={`m-1 rounded-lg p-1 flex justify-center items-center h-10 max-w-36 ${index === highlightId?'bg-gray-300':'bg-gray-100'}`}>
                                    <div className="text-[0.8em]">
                                        {value.name}
                                    </div>
                                    <button className="text-sm text-red-500 pl-1"
                                    onClick={()=>{
                                        handleDeleteFunction(index)
                                    }}
                                    >
                                        X                            
                                    </button>
                                </div>
                            )
                        }
                       }) 
                    }
                </div>
                <form className="input-field ">
                    <input type="text" name="input-field-input" placeholder=" " ref={inputRef} 
                    onFocus={dropDownEnterHandler} 
                    onBlur={(e)=>{dropDownLeaveHandler()}}
                    onKeyDown={(e)=>{
                            if(currentUser === "" && e.key === "Backspace"){
                                if(selectedUsersId.size !==0 && highlightId === -1 && isInputActive){
                                    e.stopPropagation()
                                    setHighLightId(Math.max(...selectedUsersId))           
                                    inputRef!.current!.blur()
                                }                               
                        }
                    }}
                    onChange={(e)=>{
                        setCurrentUser(e.target.value)
                    }}
                    />
                    <label htmlFor="input-field-input">Add new user...</label>
                    {
                        isInputActive && <DropDown dropDownRef={dropDownRef} usersData={usersData} handleUserAdding={handleUserAdding} selectedUsersId={selectedUsersId} currentUser={currentUser}/>
                    }
                </form>
                <div className={`border-class border-b-[0.2rem]`} 
                style={{
                    borderBottomColor:`${borderColor}`
                }}
                />
                {selectedUsersId.size !== 0 && 
                    <div className="w-[50%] absolute top-[34%]">
                    <span className="hover:bg-gray-100 rounded-lg p-1 cursor-pointer"
                    onClick={()=>{
                        setSelectedUsersId(new Set());
                        setBorderColor("gray")
                    }}
                    >
                        Clear all
                    </span>
                    </div>
                }
            </div>
        </div>
      );
}
 
export default InputField;
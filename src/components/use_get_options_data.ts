import {useGetLaunchListQuery} from "../generated/graphql";
import {useCallback, useMemo, useState} from "react";
import {ApolloError} from "@apollo/client";

type Option = {label: string}

const useGetOptionsData: () => {
    error: ApolloError | undefined,
    relationOptions: Option[],
    positionOptions: Option[],
    addNewOption: (type: ("RELATION" | "POSITION"), value: string) => void,
    loading: boolean
} = () => {
    const {data, error, loading} = useGetLaunchListQuery()
    const [customRelationOptions,setCustomRelationOptions] = useState<Option[]>([])
    const [customPositionOptions,setCustomPositionOptions] = useState<Option[]>([])
    const options: Option[] = useMemo(()=>{
        if (!data) return []
        return data?.launches.map(item=> {
            return {label: item.mission_name}
        })
    },[data])
    const addNewOption = useCallback((type: "RELATION" | "POSITION", value: string)=>{
        const callback = type === "RELATION" ? setCustomRelationOptions : setCustomPositionOptions
        const exists = type === "RELATION" ? customRelationOptions : customPositionOptions
        callback([...exists, {label: value}])
    },[customPositionOptions, customRelationOptions])
    return {
        error: error,
        relationOptions: useMemo(()=>[...options, ...customRelationOptions],[customRelationOptions, options]),
        positionOptions: useMemo(()=>[...options, ...customPositionOptions],[customPositionOptions, options]),
        addNewOption,
        loading
    }
}
export {useGetOptionsData}
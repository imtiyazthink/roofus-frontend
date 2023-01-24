import React from 'react'
import CreateEnrollModal from '../../Dashboard/EnrollHouse/CreateEnrollModal'
import CreateOpenHouseModal from '../../Dashboard/Open House/CreateOpenHouseModal'
import CreatePropertyModal from '../../Dashboard/Property/CreatePropertyModal'
import CreateUserModal from '../../Dashboard/User/CreateUserModal'

const TableAction = ({index, option, props, handleClose}: ActionProps) => {
  return (
    <div key={index}>
            {props.navigation === "tenant" && (
              <CreateUserModal
                action={option.name}
                key={index}
                text={option.name}
                id={props.id}
                closeMenu={handleClose}
              />
            )}
            {props.navigation === "property" && (
              <CreatePropertyModal
                action={option.name}
                key={index}
                text={option.name}
                id={props.id}
                closeMenu={handleClose}
              />
            )}

            {props.navigation === "enroll" && (
              <CreateEnrollModal
                action={option.name}
                key={index}
                text={option.name}
                id={props.id}
                closeMenu={handleClose}
              />
            )}

            {props.navigation === "open-house" && (
              <CreateOpenHouseModal
                action={option.name}
                key={index}
                text={option.name}
                id={props.id}
                closeMenu={handleClose}
              />
            )}
          </div>
  )
}

interface ActionProps {
    index: number;
    option: any;
    props: any;
    handleClose: () => void;
  }

export default TableAction
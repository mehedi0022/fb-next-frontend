import React from 'react'


type Props = {
  params: {
    id: number;
  };
};

function Packages({ params }: Props) {
      const { id } = params; d
  return (
    <div>Packages:{id} </div>
  )
}

export default Packages
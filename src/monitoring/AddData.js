import React from 'react';

const AddData = ({ closeModal }) => {
    

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-sm w-full mx-auto">
        <h2 className="text-lg font-bold mb-4">데이터 추가</h2>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          추가
        </button>
        <button onClick={closeModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          닫기
        </button>
      </div>
    </div>
  )
}

export default AddData;
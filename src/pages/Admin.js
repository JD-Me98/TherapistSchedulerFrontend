import React from 'react'

export default function Admin() {
  return (
    <div>
        <div>
            <div>
                <form >
                    <input type='text' name='specialty'/><br/>
                    <input type='text' name='description'/><br/>
                    <input type='file' name='image_url'/><br/>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    </div>
  )
}

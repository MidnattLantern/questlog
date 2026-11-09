import type { IDraft } from "../../models/draft"
import Styles from "./EditCreateForm.module.scss"

function EditCreateForm({
    draft,
    handleSetDraft,
    handleSave,
    disabledSubmitButton,
    submitButtonText = 'Save'
} : {
    draft: IDraft,
    handleSetDraft: (event: React.ChangeEvent) => void,
    handleSave: (event: React.SubmitEvent) => void,
    disabledSubmitButton: boolean,
    submitButtonText?: string
}) {

    return (
        <form className={Styles.form} onSubmit={handleSave}>
            <label>
                <span>Title</span>
                <input type="text" name="title" value={draft.title} onChange={handleSetDraft}/>
            </label>

            <fieldset>
                <legend>Platform</legend>
                <label>
                    <span>Presets</span>
                    <select name="platform" defaultValue={draft.platform} onChange={handleSetDraft}>
                        <option value="">{`None (enter manually)`}</option>
                        <optgroup label="Steam">
                            <option value={"Steam for Windows"}>Steam for Windows</option>
                            <option value={"Steam for Mac"}>Steam for Mac</option>
                            <option value={"Steam for Linux"}>Steam for Linux</option>
                        </optgroup>
                        <optgroup label="Xbox">
                            <option value={"Xbox One"}>Xbox One</option>
                            <option value={"Xbox Series"}>Xbox Series</option>
                            <option value={"Xbox PC"}>Xbox PC</option>
                        </optgroup>
                        <optgroup label="Playstation">
                            <option value={"Playstation 4"}>Playstation 4</option>
                            <option value={"Playstation 5"}>Playstation 5</option>
                        </optgroup>
                        <optgroup label="Switch">
                            <option value={"Nintendo Switch"}>Nintendo Switch</option>
                            <option value={"Nintendo Switch 2"}>Nintendo Switch 2</option>
                        </optgroup>
                    </select>
                </label>
                <label>
                    <span>Platform name</span>
                    <input type="text" name="platform" value={draft.platform} onChange={handleSetDraft}/>
                </label>
            </fieldset>

            <fieldset>
                <legend>Stauts</legend>
                <label>
                    <input type="radio" name="status" value={'playing'} checked={draft.status === 'playing'} onChange={handleSetDraft}/>
                    <span>Playing</span>
                </label>
                <label>
                    <input type="radio" name="status" value={'completed'} checked={draft.status === 'completed'} onChange={handleSetDraft}/>
                    <span>Completed</span>
                </label>
                <label>
                    <input type="radio" name="status" value={'want'} checked={draft.status === 'want'} onChange={handleSetDraft}/>
                    <span>Want</span>
                </label>
                <label>
                    <input type="radio" name="status" value={'dropped'} checked={draft.status === 'dropped'} onChange={handleSetDraft}/>
                    <span>Dropped</span>
                </label>
            </fieldset>

            <fieldset>
                <legend>Rating</legend>
                <label>
                    <input type="radio" name="rating" value={1} checked={draft.rating === 1} onChange={handleSetDraft}/>
                    <span>1</span>
                </label>
                <label>
                    <input type="radio" name="rating" value={2} checked={draft.rating === 2} onChange={handleSetDraft}/>
                    <span>2</span>
                </label>
                <label>
                    <input type="radio" name="rating" value={3} checked={draft.rating === 3} onChange={handleSetDraft}/>
                    <span>3</span>
                </label>
                <label>
                    <input type="radio" name="rating" value={4} checked={draft.rating === 4} onChange={handleSetDraft}/>
                    <span>4</span>
                </label>
                <label>
                    <input type="radio" name="rating" value={5} checked={draft.rating === 5} onChange={handleSetDraft}/>
                    <span>5</span>
                </label>
            </fieldset>

            <label>
                <span>Cover image "URL" link</span>
                <input type="text" name="coverUrl" value={draft.coverUrl} onChange={handleSetDraft}/>
            </label>
            {draft.coverUrl ? <img src={draft.coverUrl} alt="Image preview" width={300}/> : <p>Image Preview</p>}

            <label>
                <span>Notes</span>
                <textarea value={draft.notes} name="notes" rows={5} onChange={handleSetDraft}/>
            </label>

            <input type="submit" value={disabledSubmitButton ? 'Saving…' : submitButtonText} disabled={disabledSubmitButton}/>
        </form>
    )
}

export default EditCreateForm
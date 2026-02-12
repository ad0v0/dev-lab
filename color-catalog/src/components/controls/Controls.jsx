import "@/styles/components/controls.css";
import { BaseColorControl } from  "@/components/controls/BaseColorControl.jsx";
import { ModeControl } from "@/components/controls/ModeControl.jsx";
import { LimitControl } from "@/components/controls/LimitControl.jsx";
import { SearchControl } from "@/components/controls/SearchControl.jsx";
import { SortControl } from "@/components/controls/SortControl.jsx";
import { ResetControl } from "@/components/controls/ResetControl.jsx";

export const Controls = () => {
  return (
    <div className="controls">
      <div className="controls-group controls-group-main">
        <div className="control">
          <BaseColorControl />
        </div>

        <div className="control">
          <ModeControl />
        </div>

        <div className="control">
          <LimitControl />
        </div>

        <div className="control">
          <SortControl />
        </div>

        <div className="control">
          <ResetControl />
        </div>
      </div>

      <div className="controls-group controls-group-additional">
        <div className="control">
          <SearchControl />
        </div>
      </div>
    </div>
  )
}

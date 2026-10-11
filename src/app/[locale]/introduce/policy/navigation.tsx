import type { Policy } from './types';

interface Props {
    policies: Pick<Policy, 'code' | 'title'>[];
    activeCode: string | null;
    onNavigate: (code: string) => void;
    className?: string;
}

// Presentational: chỉ nhận props, bắn event lên cha (props down, events up).
// Giữ class .p-panelmenu* để tái sử dụng style trong introduce-policy.scss.
export default function PolicyNavigation({ policies, activeCode, onNavigate, className = '' }: Props) {
    return (
        <nav className={`panel-menu-custom ${className}`}>
            <div className="p-panelmenu">
                {policies.map((policy) => (
                    <div key={policy.code} className="p-panelmenu-panel">
                        <div className="p-panelmenu-header-content">
                            <button
                                type="button"
                                className={`item-menu w-full text-left ${activeCode === policy.code ? 'item-active' : ''}`}
                                onClick={() => onNavigate(policy.code)}
                            >
                                <span className="font-semibold">{policy.title}</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </nav>
    );
}
